# Requirements:
    Install dependencies:
        PostgreSQL 13.0
        Docker 19.03.13
        Docker-compose 1.27.4

# Set environment
    Cerate file .env file in root directory with following content in it
        PORT =  3000
        POSTGRES_USER = "docker"
        POSTGRES_PASSWORD = "docker"
        POSTGRES_HOST = "localhost:5432"
        POSTGRES_DB = "gis"
        DATABASE_URL = "postgres://docker:docker@db:5432/gis"     

# Installation:
    git clone https://github.com/nihal-geospoc/mapbox-gl-demo.git
    cd mapbox-gl-demo
    docker-compose up

# Output:
    http://localhost:4200
