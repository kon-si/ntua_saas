# NTUA ECE SAAS 2022 PROJECT | TEAM (20) - EnergyLive
  
## Description + Technologies
The goal of this project is to create a Web Application in the form of SaaS ! <br>
The end user should be able to subcribe to our monthly service and we will provide him/her with detailed graphs and statistics of the energy data that all the EU countries produce each day <br>
We provide authorization with google credentials as well as with our own authentication service !<br>
**Tools Used :** <br> 
![Javascript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Webpack](https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=000000)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=FFFFFF)
![Kafka](https://img.shields.io/badge/apache_kafka-000000?style=for-the-badge&logo=apache-kafka&logoColor=FFFFFF)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=FFFFFF)<br>
**Platform Link :** <br>
🔗[https://www.energy-live.com](https://web-server-image-47nenum5kq-ew.a.run.app/)

**Youtube Link :** <br>
🔗[EnergyLive | presentation](https://www.youtube.com/watch?v=p7G_NZAOIMI)

## 👩‍💻 Contributors (Alphabetically)
| Name  | Diagrams / Architecture | Database | API | Frontend | Parser / Data | Importer | Testing | Kafka (Messaging) | Cloud / Containers | SSE |
| --- | :---: | :---: | :---:  | :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
|[christidia](https://github.com/christidia)       |||||||❤️||||
|[elinasyr](https://github.com/elinasyr)           |❤️|||❤️||||||| 
|[kon-si](https://github.com/kon-si)               |❤️|❤️|❤️||❤️|❤️||❤️|❤️|| 
|[nickbel7](https://github.com/nickbel7)           |❤️|❤️||❤️|❤️|❤️||❤️|❤️|❤️| 
|[nikosece2019](https://github.com/nikosece2019)   ||❤️|||❤️|||||| 

## 🏗️ Architecture (Microservices)
#### Link to [.vpp (Visual Paradigm) file](https://github.com/ntua/saas2022-20/blob/master/architecture/Diagrams/Saas-Project.vpp)
| Component | Sequence | ER | Deployment
| --- | --- | --- | --- |
| <img width="200" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/architecture/Diagrams/Photos/Component-diagram.png"> | <img width="200" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/architecture/Diagrams/Photos/Sequence-diagram.png"> | <img width="200" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/architecture/Diagrams/Photos/ER-diagram.png"> | <img width="200" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/architecture/Diagrams/Photos/Deployment-diagram.jpg"> | 

---

### <ins>How it works</ins>
The whole architecture is based on Microservices ! <br>
The client [(frontend)](https://github.com/ntua/saas2022-20/tree/master/frontend) first communicates throught restful APIs (
[Total](https://github.com/ntua/saas2022-20/tree/master/microservice-api-total), 
[Generation](https://github.com/ntua/saas2022-20/tree/master/microservice-api-generation), 
[Flows](https://github.com/ntua/saas2022-20/tree/master/microservice-api-flows)
) with the server utilizing SSE (server side events) for asynchronous and continuous data communication (this means that the servers stores all the client sessions and sends new packets to them when new data are inserted in the database). Each API's endpoint is a seperate microservice listening to its own port, thus, if one goes down then the rest of them will continue to function properly. <br>

**Now, what is it happening at the back ?** <br>
We have seperated our microservices corresponding to the three types of data streams (Actual Total Consumption, Generation per Energy Type, Energy Flows) <br>
Each data stream has its own database (+1 which stores all the users), its own parser and importer. <br>

**Parser** (
[Total](https://github.com/ntua/saas2022-20/tree/master/microservice-parser-total),
[Generation](https://github.com/ntua/saas2022-20/tree/master/microservice-parser-generation),
[Flows](https://github.com/ntua/saas2022-20/tree/master/microservice-parser-flows) 
) : <br>
The parser microservice is responsible to get the new data from an ftp server, parse it by removing all unessasairy rows and columns, then zip it, upload it to the cloud storage bucket and notify the importer throught kafka. <br>
One can triger the parser to download the latest csv from a REST API endpoint (ex. https://api-total-image-47nenum5kq-ew.a.run.app/total/api/parser/latest) <br>

**Importer** (
[Total](https://github.com/ntua/saas2022-20/tree/master/microservice-importer-total),
[Generation](https://github.com/ntua/saas2022-20/tree/master/microservice-importer-generation),
[Flows](https://github.com/ntua/saas2022-20/tree/master/microservice-importer-flows)
) : <br>
The importer is the microservice that is responsible to "listen" to kafka for new incoming data and importing them into the database. <br>
More specifically, it communicates with the parser microservice throught messaging and when a new csv arrives in the cloud storage bucket, the importer downloads it, unzips it, deletes the appropriate data of that month and then inserts the new. When that process finishes, it notifies the API microservices (throught messaging - Kafka) with the first and last date of the new data, so that the endpoint that stores all the client sessions does not have to notify the ones that have not requested data that were updated !


## ☁️ Deploy (Google Cloud Platform)
**Technologies Used** 
- Cloud Run
- Container Registry
- Cloud SQL
- Cloud Storage
<div>
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/Cloud-images.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/Cloud-services.png">
</div>

## 🪟 Frontend
**Technologies Used** 
- Html, SCSS, JS, Ajax
- Web-pack
- Open Layers (maps)
- Nunjucks
<div>
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Login.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Register.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Home.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Total.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Generation.png">
<img align="center" width="380" height="auto" src="https://github.com/ntua/saas2022-20/blob/master/Photos/UI/Flows.png">
</div>

## 🐛 [Testing](https://github.com/ntua/saas2022-20/tree/master/testing)
**For more detailed info go to testing folder**
<div>
<img align="center" width="380" height="auto" src="https://user-images.githubusercontent.com/94255085/177210010-5d52cb19-2109-4dca-89e6-316934efa57d.png">
<img align="center" width="380" height="auto" src="https://user-images.githubusercontent.com/94255085/177208610-afb89c61-da0e-46c4-9ebb-28102e9e1d7c.png">
</div>
  
  
