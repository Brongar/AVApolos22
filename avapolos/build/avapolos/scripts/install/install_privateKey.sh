#!/usr/bin/env bash

#This script needs to run as root.
if [ "$EUID" -ne 0 ]; then
  echo "Este script precisa ser rodado como root"
  exit
fi

#If the header file is present on the system.
if [ -f "/etc/avapolos/header.sh" ]; then
  #Source it.
  source /etc/avapolos/header.sh
#If it's not present.
else
  #Tell the user and exit with an error code.
  echo "Não foi encontrado o arquivo header.sh"
  exit 1
fi

log debug "install_privateKey.sh" 
log info "Instalando chave privada." 

log debug "Criando diretório para as chaves." 
sudo -u avapolos mkdir -p $SSH_PATH

log debug "Extraindo chaves da IES." 
cp $ROOT_PATH/ssh.tar.gz $HOME_PATH
cd $HOME_PATH
tar xvfz ssh.tar.gz

log debug "Ajustando permissões." 
chmod 700 $SSH_PATH
chmod 600 $SSH_PATH/*
chown $AVAPOLOS_USER:$AVAPOLOS_GROUP $SSH_PATH -R

log debug "Reiniciando serviços ssh." 
systemctl restart sshd.service
systemctl restart ssh.service
