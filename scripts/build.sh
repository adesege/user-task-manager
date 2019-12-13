echo "==============================";
echo "Running command for client";
echo "==============================";
cd client && yarn install && cd ..

for service in ./services/*; do (
  if [[ -f "$service"/yarn.lock ]]; then
    echo "==============================";
    echo "Running command for \"$service\" service";
    echo "==============================";
    ( cd $service; yarn install )
  fi
)
done
