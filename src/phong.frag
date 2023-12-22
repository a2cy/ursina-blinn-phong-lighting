#version 150

uniform sampler2D p3d_Texture0;
uniform vec3 light_position;
uniform vec3 camera_position;

in vec2 texcoord;
in vec3 frag_position;
in vec3 normal;

out vec4 p3d_FragColor;


void main() {
    vec3 ambient_color = vec3(0.2, 0.2, 0.25);
    vec3 light_color = vec3(1.0, 1.0, 0.8);
    vec3 specular_color = vec3(0.8, 1.0, 0.8);
    float specular_strength = 0.5;

    vec4 color = texture(p3d_Texture0, texcoord);

    vec3 light_direction = normalize(light_position - frag_position);
    vec3 view_direcion = normalize(camera_position - frag_position);
    vec3 reflect_direcion = reflect(-light_direction, normal);

    vec3 diffuse_light = max(dot(normal, light_direction), 0.0) * light_color;

    vec3 specular_light = specular_strength * pow(max(dot(view_direcion, reflect_direcion), 0.0), 32.0) * specular_color;

    color = pow(color * vec4(ambient_color + diffuse_light + specular_light, 1.0), vec4(0.4545));
    p3d_FragColor = color;
}