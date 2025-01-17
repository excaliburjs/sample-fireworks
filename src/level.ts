import { Color, DefaultLoader, Engine, ExcaliburGraphicsContext, Random, Scene, SceneActivationContext, Timer, vec } from "excalibur";
import { Firework } from "./firework";

export class MyLevel extends Scene {
    timer!: Timer;
    constructor() {
        super();
        this.backgroundColor = Color.Black;
    }
    override onInitialize(engine: Engine): void {
        const random = new Random(1337);

        const fireworks: Firework[] = [];
        for (let i = 0; i < 20; i++) {
            const firework = new Firework(vec(400, 600), 4000, random);
            fireworks.push(firework);
            this.add(firework);
        }
        let currentFireworkIndex = 0;
        const launch = () => {
            fireworks[currentFireworkIndex].launch();
            currentFireworkIndex = (currentFireworkIndex + 1) % fireworks.length;
        };

        this.input.pointers.on('down', launch);
        this.input.keyboard.on('press', launch);

        this.timer = new Timer({
            fcn: launch,
            interval: 1000,
            repeats: true
        });
        this.timer.start();
        this.add(this.timer);
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time

    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Called before anything updates in the scene
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Called after everything updates in the scene
    }

    override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called before Excalibur draws to the screen
    }

    override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called after Excalibur draws to the screen
    }
}
