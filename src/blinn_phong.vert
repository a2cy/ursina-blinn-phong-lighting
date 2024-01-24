#version 150

uniform mat4 p3d_ModelViewProjectionMatrix;
uniform mat4 p3d_ModelViewMatrix;
uniform mat3 p3d_NormalMatrix;
uniform mat4 p3d_ViewMatrix;
uniform vec3 u_light_position;


in vec4 p3d_Vertex;
in vec3 p3d_Normal;
in vec2 p3d_MultiTexCoord0;

out vec2 texcoord;
out vec3 fragcoord;
out vec3 light_pos;
out vec3 normal;


void main() {
    gl_Position = p3d_ModelViewProjectionMatrix * p3d_Vertex;

    texcoord = p3d_MultiTexCoord0;
    fragcoord = vec3(p3d_ModelViewMatrix * p3d_Vertex);
    light_pos = vec3(p3d_ViewMatrix * vec4(u_light_position, 1.0));
    normal = normalize(p3d_NormalMatrix * p3d_Normal);
}
