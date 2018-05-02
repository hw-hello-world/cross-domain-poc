## Setup

0. prerequisites is you already have develop env setup for my-okta
1. add following to your `/etc/hosts` file (MAC OS, google where is the hosts file for other OS)

```
127.0.0.1 nba.hw.com
127.0.0.1 login.hw.com
127.0.0.1 nba.hw-preview.com
127.0.0.1 login.hw-preview.com
```

2. `npm install -g http-server`
3. `make all`
4. you shall be able to open
  - http://nba.hw.com:9876/main.html    --> mimic a okta customer org
  - http://login.hw.com:9876/login.html  --> mimic login.okta.com
  - http://login.hw.com:9876/iframe.html  --> persist login data into localStorage
  - http://nba.hw-preview.com:9876/main.html  --> mimic a okta customer preview org
  - http://login.hw-preview.com:9876/iframe.html  --> persist login data into localStorage
5. open http://nba.hw.com:9876/main.html to login a user
6. open http://nba.hw-preview.com:9876/main.html to login another user
7. open http://login.hw.com:9876/login.html and the account choose shall display those 2 login users.
  ** FAILED **: when 'block 3rd-party cookie' option is on, it is NOT allow read from localStorage as well.
