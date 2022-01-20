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
// criamos um objeto
const transportMap = {
    "earth": Truck,
    "water": Ship,
}

// pegamos as chaves do objeto. "earth" | "water"
type Keys = keyof typeof transportMap;

// obtemos os tipos do objeto usando `typeof`. Truck | Ship
type transportType = typeof transportMap[Keys]

// Queremos obter o tipo de retorno da classe de usuário T.
// Mas o tipo transportType contém todas as classes as 
// typeof Developer| typeof Manager que são iguais a 
// new() => Truck | new() => Ship. Para obter o usuário Classe T,
// usamos o TypeScript Infer conforme abaixo.
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class TransportFactory {
    static transport(k: Keys): ExtractInstanceType<transportType> {
        return new transportMap[k];
    }
}

class TransportService {
    getTransport(type: Keys) {
        return TransportFactory.transport(type).delivery()
    }
}

console.log(new TransportService().getTransport("earth"))
// Output: "Transport for truck"

console.log(new TransportService().getTransport("water"))
// Output: "Transport for ship"

export { }