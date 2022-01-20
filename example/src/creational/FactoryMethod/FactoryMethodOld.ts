interface Transport {
    delivery(): string
}

class Truck implements Transport {
    delivery(): string {
        return "Transport for truck";
    }
}

class Ship implements Transport {
    delivery(): string {
        return "Transport for ship";
    }
}

class NullTransport implements Transport {
    delivery(): string {
        return "Invalid";
    }
}

class TransportFactory {
    static transport(type: string) {
        switch (type) {
            case "earth":
                return new Truck();
            case "water":
                return new Ship();
            default:
                return new NullTransport();
        }
    }
}

class TransportService {
    getTransport(type: string) {
        return TransportFactory.transport(type).delivery()
    }
}

console.log(new TransportService().getTransport("earth"))
// Output: "Transport for truck"

console.log(new TransportService().getTransport("water"))
// Output: "Transport for ship"

export { }