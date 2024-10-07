dev:
	docker compose -f docker-compose.dev.yml up --remove-orphans -d

prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans -d
