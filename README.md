# Bad Jest behavior

This is a simplified version of a project showing some poor jest behavior.

The main project involves an implementation of a half-edge data structure for storing mesh data. The important point is that the data structure consists of a number of different elements that are all linked, and it is ultimately self-referential, creating circular references. 

A trivially wrong assertion like ` expect(mesh.faces[0]).toBe(mesh.faces[1]);` takes non-trivial amounts of time to complete because of the time it takes to produce the diff output. 


## To see the problem

- Run `npm install`
- Run `npm test`
- Wait