/**
 * 생각이 보이는 교실 - Service Worker
 * PWA 지원 및 오프라인 캐싱
 */

const CACHE_NAME = 'thinking-classroom-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/themes.css',
  '/assets/css/animations.css',
  '/assets/css/responsive.css',
  '/assets/css/search-filter.css',
  '/assets/js/main.js',
  '/assets/js/theme-switcher.js',
  '/assets/js/tools-manager.js',
  '/data/tools.json'
];

// 설치 이벤트 - 캐시 생성
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시 열림');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('모든 리소스가 캐시되었습니다');
        return self.skipWaiting();
      })
  );
});

// 활성화 이벤트 - 이전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 가져오기 이벤트 - 캐시 우선, 네트워크 폴백
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에서 찾으면 반환
        if (response) {
          // 백그라운드에서 네트워크 업데이트
          fetchAndUpdateCache(event.request);
          return response;
        }

        // 캐시에 없으면 네트워크 요청
        return fetch(event.request).then(response => {
          // 유효한 응답이 아니거나 외부 리소스인 경우 그대로 반환
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답을 복제하여 캐시에 저장
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // 네트워크 요청 실패 시 오프라인 페이지 표시
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// 백그라운드에서 캐시 업데이트
function fetchAndUpdateCache(request) {
  return fetch(request)
    .then(response => {
      if (response && response.status === 200 && response.type === 'basic') {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(request, responseToCache);
          });
      }
    })
    .catch(() => {
      // 네트워크 오류 무시 (이미 캐시에서 제공됨)
    });
}

// 메시지 이벤트 - 캐시 강제 업데이트
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'clearCache') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('캐시가 삭제되었습니다');
    });
  }
});

// 주기적 백그라운드 동기화 (실험적 기능)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-tools') {
    event.waitUntil(updateToolsData());
  }
});

// 도구 데이터 업데이트
async function updateToolsData() {
  try {
    const response = await fetch('/data/tools.json');
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/data/tools.json', response);
      console.log('도구 데이터가 업데이트되었습니다');
    }
  } catch (error) {
    console.error('도구 데이터 업데이트 실패:', error);
  }
}
