front-app : Vue 2.0
mediator: nodejs with express

the configuration file path:
/mock-config/MockConfiguration.json


  "pollingFrequency": 1,
  scoreRange: 1-100
  allowedClients: 1-5

** NOTE: pollingFrequency is on seconds which mean in this config every second the server send score notification. 
Check configuration file

To see result in app:

1. navigate to front-app
2. npm run dev
3. navigate to mediator
4. npm start
5. Navigate to: http://localhost:5173/
6. put number between 1 to 5 (unless you changed the configuration ;)
7. observe score
8. if you want to check for unauthorized clients refresh the page and put number that is not allowed to subscribe
