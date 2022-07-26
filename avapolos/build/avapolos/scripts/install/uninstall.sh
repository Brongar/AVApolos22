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

log debug "uninstall.sh" 
log info "Desinstalando AVAPolos." 

cd $SCRIPTS_PATH

if ! [ -z "$(cat $SERVICES_PATH/started_services)"  ]; then
  bash stop.sh
fi

log debug "Parando e removendo serviço" 
systemctl stop avapolos.service 
systemctl disable avapolos.service
rm -rf /etc/systemd/system/avapolos.service

cd $INSTALL_SCRIPTS_PATH
bash uninstall_docker.sh
bash uninstall_networking.sh
bash uninstall_user.sh

rm -rf $ROOT_PATH
rm -rf /usr/local/bin/avapolos.sh
rm -rf /usr/share/applications/avapolos.desktop
rm -rf $ETC_PATH
rm -rf $LOG_PATH
rm -rf $INSTALLER_DIR_PATH
rm -rf $EDUCAPES_PATH
rm -rf $HOME_PATH

echo "Revertendo configurações nos repositórios."
rm /etc/apt/sources.list
mv /etc/apt/sources.list.old /etc/apt/sources.list

echo "Desinstalação concluída."
