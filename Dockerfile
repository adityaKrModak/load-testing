
# Stage 1: Setup Go environment and build custom k6 from sources using xk6 (https://github.com/grafana/xk6)
FROM golang:1.21-alpine as builder
WORKDIR $GOPATH/src/go.k6.io/k6
ADD . .
RUN apk --no-cache add git
RUN CGO_ENABLED=0 go install go.k6.io/xk6/cmd/xk6@latest
# TODO - Want more extensions?! Provide additional `--with ...` lines to the following command:
RUN CGO_ENABLED=0 xk6 build \
    --with github.com/grafana/xk6-output-influxdb=${PWD}/dependencies/xk6-output-influxdb \
    --with github.com/grafana/xk6-output-kafka=${PWD}/dependencies/xk6-output-kafka \
    --with github.com/grafana/xk6-output-prometheus=${PWD}/dependencies/xk6-output-prometheus\
    --output /tmp/k6

# Stage 2: Create lightweight runtime environment for the custom k6 binary with browser support
FROM alpine:3.19
RUN apk add --no-cache ca-certificates chromium-swiftshader \
    && adduser -D -u 12345 -g 12345 k6
COPY --from=builder /tmp/k6 /usr/bin/k6

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

ENV K6_BROWSER_HEADLESS=true

USER 12345
WORKDIR /home/k6

ENTRYPOINT ["k6"]
