from ursina import *


if __name__ == "__main__":
    app = Ursina()

    phong_shader = Shader.load(Shader.GLSL, vertex="./phong.vert", fragment="./phong.frag")

    light = Entity(model="sphere", position=Vec3(1, 1, 1), scale=.2, color=color.yellow)
    
    sphere = Entity(model="sphere", shader=phong_shader)

    EditorCamera()

    def update():
        sphere.set_shader_input("light_position", light.world_position)
        sphere.set_shader_input("camera_position", camera.world_position)

        sphere.rotate(Vec3(0, .5, 0))

    app.run()