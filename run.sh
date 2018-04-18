#!/bin/bash
 echo "Bash version ${BASH_VERSION}..."
 for i in {0..1000..1}
    do
       node runner.js $i
 done