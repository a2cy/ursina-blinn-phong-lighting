#version 150

uniform mat4 p3d_ModelViewProjectionMatrix;
uniform mat4 p3d_ModelMatrixInverse;

in vec4 p3d_Vertex;
in vec3 p3d_Normal;
in vec2 p3d_MultiTexCoord0;

out vec2 texcoord;
out vec3 normal;


void main() {
    gl_Position = p3d_ModelViewProjectionMatrix * p3d_Vertex;

    texcoord = p3d_MultiTexCoord0;
    normal = mat3(transpose(p3d_ModelMatrixInverse)) * p3d_Normal;
}
