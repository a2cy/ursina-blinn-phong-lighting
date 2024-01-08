from ursina import *


if __name__ == "__main__":
    app = Ursina(borderless=False)

    blinn_phong_shader = Shader.load(Shader.GLSL, vertex="./blinn_phong.vert", fragment="./blinn_phong.frag")

    light = Entity(model="sphere", position=Vec3(1, 2, -1.5), scale=.2, color=color.yellow)

    sphere = Entity(model="sphere", shader=blinn_phong_shader, color=color.red)

    EditorCamera()

    def update():
        sphere.set_shader_input("u_light_position", light.world_position)
        sphere.set_shader_input("u_resolution", window.size)

        sphere.rotate(Vec3(0, .5, 0))

    app.run()