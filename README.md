# sua-agenda

## goals

  - [x] login with google account using 'next-auth'.
  - [x] test initial in requests to google calendar api '@googleapis/calendar'.
  - [ ] define next implementations.

### techs
  - nvm v0.39.5
  - node v18.20.4
  - docker v24.0.7
  - next.js v15.0.2

### libraries
  - next-auth
  - @googleapis/calendar

### difficulties encountered throughout the project

  - In my opinion, the Next Auth documentation is not very clear about the actions required to implement the 'Google Provider'. However, I was able to reach the content needed to initialize the connection with a Google account. Below I will list the links that helped me implement the Google Provider:
    - https://next-auth.js.org/configuration/options [next-auth options]
    - https://next-auth.js.org/providers/google [setup of google-provider]
    - https://next-auth.js.org/configuration/callbacks [docs about callback functions]

  - Using the '@googleapis/calendar' library was simpler than expected, it took me a considerable amount of time to understand how to perform access_token updates and how to make requests to the Google Calendar API.
