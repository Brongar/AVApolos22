Online syncronization is done by copying the packet via rsync.

The internal procedure is as follows:

while [ 1 ]
do
    rsync -avz --timeout=60 --partial source dest
    if [ "$?" = "0" ] ; then
        echo "rsync completed normally"
        exit
    else
        echo "Rsync failure. Backing off and retrying..."
        sleep 180
    fi
done

