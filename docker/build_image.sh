docker login registry.gitlab.com
docker build -t registry.gitlab.com/sprint-technology/watthelp/front/node .
docker push registry.gitlab.com/sprint-technology/watthelp/front/node
