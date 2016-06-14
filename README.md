# reactive-di-todomvc

Basic solutions for typical web app tasks.

Stack:
 - reactive-di
 - reactive-di-observable
 - modern-router
 - jss
 - any-translate
 - react

## Run

1. npm install
2. npm start
3. open http://localhost:8080

## Features

- [x] Common
  - [x] Isomorphic app
  - [x] React free: any hyperscript + jsx transpiler friendly
  - [x] Folder structure
  - [x] Absolute imports
  - [x] Interface based hierarcical dependency injection
  - [x] Component approach
  - [x] I18n, L10n
  - [x] Validation
    - [x] Validation rules sharing
  - [x] Multiple environments / configuration management
  - [x] Multiple frontend entry points
  - [x] Universal routing for backend/frontend
  - [x] URL generation from route name and parameters

- [ ] Frontend
  - [x] Mount/unmount and update CSS in runtime
  - [x] Frontend REST API
  - [ ] Frontend dataflow
    - [ ] Rehydrate data from json
    - [ ] Observable sources
    - [x] Emit loading data on access
    - [x] Local state per component
  - [x] Data fetching
    - [x] Optimistic updates
    - [x] Request queue
    - [x] Bad connection handling
    - [ ] Retries
    - [x] Progress indication
  - [ ] Forms
    - [x] Error messages
    - [ ] Debounce
    - [ ] Double submit prevention
  - [x] Security
    - [x] Authorization per page
  - [ ] CRUD
    - [x] Create
    - [ ] Detail
    - [x] Edit
    - [x] Remove
    - [x] Inline edit
    - [ ] Drag & Drop example
  - [ ] Index
    - [x] Filters
    - [x] Sorts
    - [x] Perpage
    - [ ] Pagination
    - [x] Frontend-only filtering, sorting, perpage (whenever possible)
    - [ ] Example of infinite scroll
    - [ ] Example of masonry

- [ ] Backend
  - [ ] Backend REST API
  - [x] Define frontend variables from backend / bundler
  - [x] Page rendering
  - [ ] Hydrate data
  - [ ] CORS support
  - [ ] GZIP support
  - [ ] DB pooling

- [ ] Bundling
  - [x] Webpack
  - [ ] Bundle minification (prod)
  - [ ] Bundle uglification (prod)
  - [ ] Bundle vendor splitting (dev)
  - [x] Source Maps (dev)
  - [ ] Auto inline assets (prod)
  - [ ] Cache management
  - [ ] Skip already minified files
  - [ ] Assets deduplication

- [ ] Code Quality
  - [x] Linting
  - [x] Flow
  - [ ] Unit tests
  - [ ] Functional tests
