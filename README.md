# rdi-examples

[Demo](http://zerkalica.github.io/rdi-examples/)

Basic solutions for typical web app tasks.


Stack:
 - lom_atom
 - reactive-di
 - jss
 - preact

## Run

1. npm install
2. npm start
3. open http://localhost:8080

## Features

- [x] Common
  - [ ] Isomorphic app
  - [x] React-bindings on runtime, not on compile-time
  - [x] Folder structure
  - [x] Absolute imports
  - [x] Hierarcical dependency injection
  - [x] Component approach
  - [ ] I18n, L10n
  - [ ] Validation
  - [ ] Validation rules sharing
  - [x] Multiple environments / configuration management
  - [x] Multiple frontend entry points
  - [x] Universal routing for backend/frontend
  - [x] URL generation from route name and parameters

- [ ] Frontend
  - [x] Mount/unmount and update CSS in runtime
  - [x] Frontend REST API
  - [ ] Frontend dataflow
    - [ ] Rehydrate data from json
    - [x] Observable sources
    - [x] Emit loading data on access
    - [x] Local state per component
  - [x] Data fetching
    - [ ] Optimistic updates
    - [ ] Request queue
    - [ ] Bad connection handling
    - [ ] Retries
    - [ ] Progress indication
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
  - [ ] Define frontend variables from backend / bundler
  - [ ] Page rendering
  - [ ] Css rendering from jss
  - [ ] Hydrate data
  - [ ] CORS support
  - [ ] GZIP support
  - [ ] DB pooling

- [ ] Code Quality
  - [x] Linting
  - [x] Flow
  - [ ] Unit tests
  - [ ] Functional tests
