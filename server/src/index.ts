import { Nezto } from "./core/nezto";

async function main() {
    try {
        const nezto = new Nezto();
        await nezto.run();
    } catch (err) {
        console.error(err);
    }
}

main();
