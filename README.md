`https://employee.chainmart.site` 6000

`
server {

    listen 80;
    server_name employee.chainmart.site;

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_pass http://localhost:6000;
      proxy_redirect off;
    }

}
`