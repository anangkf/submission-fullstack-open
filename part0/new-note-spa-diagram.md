```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Submit the Form Data
    deactivate server

    Note right of browser: If success, then javascript updating the notes list even without reloading the page.

```