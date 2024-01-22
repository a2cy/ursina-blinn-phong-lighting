#version 150

uniform mat4 p3d_ProjectionMatrixInverse;
uniform mat4 p3d_ViewMatrixInverse;
uniform vec4 p3d_ColorScale;
uniform sampler2D p3d_Texture0;
uniform vec2 u_resolution;
uniform vec3 u_light_position;

in vec2 texcoord;
in vec3 normal;

out vec4 p3d_FragColor;


void main() {
    vec4 ambient_color = vec4(0.2, 0.2, 0.25, 1.0);
    vec4 light_color = vec4(1.0, 1.0, 0.8, 1.0);

    vec4 color = texture(p3d_Texture0, texcoord) * p3d_ColorScale;

    vec3 camera_position = p3d_ViewMatrixInverse[3].xyz / p3d_ViewMatrixInverse[3].w;

    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    vec4 frag_position = p3d_ProjectionMatrixInverse * vec4(uv, 1.0, 1.0);
    vec3 view_direction = -vec3(p3d_ViewMatrixInverse * vec4(normalize(frag_position.xyz / frag_position.w), 0.0));

    vec3 light_direction = normalize(u_light_position - frag_position.xyz);
    vec3 half_direction = normalize(light_direction + view_direction);

    vec4 ambient_light = ambient_color * color;
    vec4 diffuse_light = max(dot(normal, light_direction), 0.0) * color;
    vec4 fresnel = 0.25 * pow(1.0 + dot(-view_direction, normal), 3.0) * color;
    vec4 specular_light = pow(max(dot(normal, half_direction), 0.0), 32.0) * light_color;

    color = ambient_light + diffuse_light + specular_light + fresnel;

    p3d_FragColor = color;
}