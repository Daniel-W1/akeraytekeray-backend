dev:
	docker compose -f docker-compose.dev.yml up --remove-orphans -d

prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans -d

start-pg-dev:
	docker compose -f docker-compose.dev.yml up --remove-orphans -d postgresql

start-pg-prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans -d postgresql