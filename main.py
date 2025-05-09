from ursina import *


if __name__ == "__main__":
    app = Ursina(borderless=False)

    blinn_phong_shader = Shader.load(Shader.GLSL, vertex="./blinn_phong.vert", fragment="./blinn_phong.frag")

    light = Entity(model="sphere", position=Vec3(2, 4, 2), scale=.2, color=color.yellow)

    ground = Entity(model="plane", texture="grass", scale=Vec3(10, 0, 10), texture_scale=Vec2(10, 10), shader=blinn_phong_shader)

    sphere = Entity(model="sphere", position=Vec3(0, 1, 0), shader=blinn_phong_shader, color=color.red)

    EditorCamera()

    def update():
        sphere.rotate(Vec3(0, .5, 0))

    app.run()