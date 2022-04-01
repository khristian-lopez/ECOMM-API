# ECOMM API
The ECOMM API is a scalable, web-ready API designed as a drop-in microservice for a legacy ecommerce frontend. Built with MongoDB, running on Amazon EC2 t2.micro instances.

## Design
<img width="555" alt="Screen Shot 2022-03-31 at 4 54 52 PM" src="https://user-images.githubusercontent.com/89273697/161168647-39076751-7517-40ed-8c35-806043ff5b2c.png">

## Explanation
The ECOMM API has 3 layers: a load balancing layer, a t2.micro layer, and a database layer. Incoming HTTP requests first touch the load balancing layer, which consists of a single t2.micro instance running nginx. Here, HTTP requests are distributed via round robin across 3 (and if needed, more) t2.micro instances running lightweight Express servers. These Express servers contain routes which either retrieve or insert data into the database layer. The database layer consists of a single t2.micro instance running MongoDB. Stored within this database are 6.9 million documents containing information for a 'Questions and Answers' section of the legacy client this API was designed for.
