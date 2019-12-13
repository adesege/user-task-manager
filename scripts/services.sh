for service in ./services/*; do (
  if [[ -f "$service"/package.json ]]; then
    echo "==============================";
    echo "Starting service \"$service\"";
    echo "==============================";
    ( cd $service; yarn dev )
  fi
)
done
