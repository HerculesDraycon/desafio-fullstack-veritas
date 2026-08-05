# Go base image with alpine linux
FROM golang:1.24-alpine AS builder

WORKDIR /app;

# Module management files
COPY go.mod ./

# Lower Go dependencies
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]