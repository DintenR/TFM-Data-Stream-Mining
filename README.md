# TFM-Data-Stream-Mining
En este repositorio se mantendrán actualizados los ficheros de configuración y scripts utilizados para desplegar una plataforma de mantenimiento predictivo basada en la arquitectura RAI4.0

A continuación se va a hacer una descripción del contenido de cada uno de los directorios del repositorio:
 - **Ansible**: en este directorio se incluyen los playbooks empleados para automatizar el aprovisionamiento de la arquitectura hardware empleada para desplegar el sistema.
 - **Modelos**: en este directorio se incluyen los ficheros de los modelos predictivos serializados. Contiene todos los modelos entrenados y ajustados mediante un proceso de randomgridsearch y 10-fold cross validation.
 - **Notebooks**: este directorio incluye los notebooks empleados para aplicar algunas de las fases de la metodoligía CRIPS-DM al dataset analizado en el proyecto. Concretamente se incluyen los notebooks empleados para las siguientes fases: Entendimiento del problema, Entendimiento del conjunto de datos, Preparación de los datos, Construcción de modelos y Evalulación de modelos.
 - **Scripts**: en este directorio se incluyen los scripts empleados en la fase de despliegue.