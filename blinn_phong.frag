#version 150

uniform vec4 p3d_ColorScale;
uniform sampler2D p3d_Texture0;

uniform sampler2D specular_map;

in vec2 texcoord;
in vec3 fragcoord;
in vec3 light_pos;
in vec3 normal;
in vec4 vertex_color;

out vec4 p3d_FragColor;


void main() {
    vec3 ambient_color = vec3(0.2, 0.2, 0.2);
    vec3 light_color = vec3(1.0);
    float shininess = 128.0;
    float gamma = 2.2;

    vec3 color = vec3(texture(p3d_Texture0, texcoord) * p3d_ColorScale * vertex_color);
    vec3 specular_color = vec3(texture(specular_map, texcoord));

    vec3 light_direction = normalize(light_pos - fragcoord);

    vec3 view_direction = normalize(-fragcoord);
    vec3 half_direction = normalize(light_direction + view_direction);

    vec3 ambient = ambient_color * color;
    vec3 diffuse = max(dot(light_direction, normal), 0.0) * light_color * color;
    vec3 specular = pow(max(dot(normal, half_direction), 0.0), shininess) * light_color * specular_color;

    p3d_FragColor = vec4(ambient + diffuse + specular, 1.0);
}