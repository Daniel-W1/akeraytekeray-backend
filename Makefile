dev:
	docker compose -f docker-compose.dev.yml up --remove-orphans --build -d

prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans --build -d

start-pg-dev:
	docker compose -f docker-compose.dev.yml up --remove-orphans --build -d postgresql

start-pg-prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans --build -d postgresql

start-pg-test:
	docker compose -f docker-compose.test.yml up --remove-orphans --build -d postgresql