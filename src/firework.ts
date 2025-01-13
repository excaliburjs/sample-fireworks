import { Actor, BodyComponent, Color, CoordPlane, coroutine, CoroutineGenerator, Entity, GpuParticleEmitter, MotionComponent, ParticleEmitter, Random, Scene, TransformComponent, vec, Vector } from "excalibur";

export class Firework extends Actor {
    random: Random;
    trail: GpuParticleEmitter;
    explosion: GpuParticleEmitter;
    explosion2: GpuParticleEmitter;
    life: number;
    body: BodyComponent;

    constructor(pos: Vector, life: number, random: Random) {
        super({ name: "Firework" })
        this.random = random;
        this.pos = pos;
        this.acc = vec(0, 800);

        this.body = new BodyComponent();
        this.life = life;

        this.trail = new GpuParticleEmitter({
            isEmitting: false,
            emitRate: 70,
            particle: {
                life: 1000,
                endColor: Color.White,
                beginColor: Color.White,
                minSpeed: 10,
                maxSpeed: 30,
                startSize: 3,
                endSize: 0,
                fade: true,
                acc: vec(0, 50),
            }
        });

        this.explosion = new GpuParticleEmitter({
            isEmitting: false,
            particle: {
                life: 2000,
                fade: true,
                startSize: 5,
                endSize: 2,
                minSpeed: 10,
                maxSpeed: 200,
                acc: vec(0, 100),
                beginColor: Color.Red,
                endColor: Color.Yellow
            }
        });
        this.explosion2 = new GpuParticleEmitter({
            isEmitting: false,
            particle: {
                life: 1000,
                fade: true,
                startSize: 5,
                endSize: 2,
                minSpeed: 10,
                maxSpeed: 200,
                acc: vec(0, 100),
                beginColor: Color.White,
                endColor: Color.Purple
            }
        });

        this.addChild(this.trail);
        this.addChild(this.explosion);
        this.addChild(this.explosion2);
    }

    launch() {
        coroutine(this.scene!.engine, (function*(this: Firework) {
            this.vel = vec(this.random.floating(-200, 200), this.random.floating(-800, -1000));
            this.trail.isEmitting = true;
            while (this.life > 0) {
                const elapsed = yield;
                this.life -= elapsed;
                if (this.vel.y >= 0) {
                    break;
                }
            }
            this.trail.isEmitting = false;
            this.explosion.emitParticles(500);
            this.explosion2.emitParticles(500);

        } as CoroutineGenerator).bind(this))
    }

}
