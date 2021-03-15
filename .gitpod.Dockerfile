FROM gitpod/workspace-full-vnc

RUN sudo apt update && sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils -y
