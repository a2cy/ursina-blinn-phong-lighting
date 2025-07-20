from ursina import *


if __name__ == "__main__":
    app = Ursina(borderless=False)

    blinn_phong_shader = Shader.load(Shader.GLSL,
                                     vertex="./blinn_phong.vert",
                                     fragment="./blinn_phong.frag",
                                     default_input = {
                                     'texture_scale': Vec2(1,1),
                                     'texture_offset': Vec2(0,0)})

    light = Entity(model="sphere", position=Vec3(0, 2, 0), scale=.2)

    box = Entity(model="cube", texture="box", shader=blinn_phong_shader)
    box.set_shader_input("specular_map", load_texture("box_specular"))

    EditorCamera()

    u_time = 0
    def update():
        global u_time
        light.x = 2 * sin(u_time * 0.5)
        light.z = 2 * cos(u_time * 0.5)

        box.set_shader_input("u_light_position", light.world_position)

        u_time += time.dt

    app.run()