import { DefaultLoader, Engine, ExcaliburGraphicsContext, Random, Scene, SceneActivationContext, vec } from "excalibur";
import { Player } from "./player";
import { Firework } from "./firework";

export class MyLevel extends Scene {
    override onInitialize(engine: Engine): void {
        const random = new Random(1337);
        // Scene.onInitialize is where we recommend you perform the composition for your game
        const player = new Player();
        this.add(player); // Actors need to be added to a scene to be drawn
        const firework = new Firework(vec(400, 600), 2000, random);
        this.add(firework);
        firework.launch();

        this.input.pointers.on('down', () => {
            const firework = new Firework(vec(400, 600), 2000, random);
            this.add(firework);
            firework.launch();
        });
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
