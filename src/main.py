from ursina import *


if __name__ == "__main__":
    app = Ursina(borderless=False)

    phong_shader = Shader.load(Shader.GLSL, vertex="./phong.vert", fragment="./phong.frag")

    light = Entity(model="sphere", position=Vec3(20, 40, -30), scale=.2, color=color.yellow)

    sphere = Entity(model="sphere", shader=phong_shader)

    EditorCamera()

    def update():
        sphere.set_shader_input("u_light_position", light.world_position)
        sphere.set_shader_input("u_resolution", window.size)

        sphere.rotate(Vec3(0, .5, 0))

    app.run()