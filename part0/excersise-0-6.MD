# Full Stack Open Excersise 0.6

## New note in Single page app diagram

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server
    B ->> S: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
    Note left of S: {"content":"This is a SPA note !!","date":"2024-05-20T08:17:38.923Z"}
    activate S
    S -->> B: {"message":"note created"}
    deactivate S
    Note left of B: JS code previously loaded<br>update the new content
```