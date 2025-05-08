#version 150

uniform vec4 p3d_ColorScale;
uniform sampler2D p3d_Texture0;

in vec2 texcoord;
in vec3 fragcoord;
in vec3 light_pos;
in vec3 normal;

out vec4 p3d_FragColor;


void main() {
    vec4 ambient_color = vec4(0.2, 0.2, 0.25, 1.0);
    vec4 light_color = vec4(1.0, 1.0, 0.8, 1.0);

    vec4 color = texture(p3d_Texture0, texcoord) * p3d_ColorScale;

    vec3 view_direction = normalize(-fragcoord);
    vec3 light_direction = normalize(light_pos - fragcoord);
    vec3 half_direction = normalize(light_direction + view_direction);

    vec4 ambient_light = ambient_color * color;
    vec4 diffuse_light = max(dot(normal, light_direction), 0.0) * color;
    vec4 specular_light = pow(max(dot(normal, half_direction), 0.0), 32.0) * light_color;

    color = ambient_light + diffuse_light + specular_light;

    p3d_FragColor = color;
}
