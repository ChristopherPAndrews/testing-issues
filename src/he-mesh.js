
export class Vertex {
  constructor(position) {
    this.position = position;
    this.halfEdge = null;
  }
}

export class Face {
  constructor(halfEdge = null) {
    this.halfEdge = halfEdge;
  }
}

export class Edge {
  constructor(mesh, halfEdge = null) {
    this.mesh = mesh;
    this.halfEdge = halfEdge;
  }
}

export class HalfEdge {
  constructor(vertex, face, edge) {
    this.vertex = vertex;
    this.face = face;
    this.edge = edge;
    this.next = null;
    this.twin = null;
  }
}

export class HEMesh {
  vertices = [];
  faces = [];
  edges = [];
  halfEdges = [];

  /**
   * Construct a half-edge mesh from polygon soup, where the vertices are specified with BABYLON.Vector3 objects
   *
   * @param {*} vertices
   * @param {*} faces
   */
  constructor(vertices, faces) {
    // create the vertices
    this.vertices = vertices.map((v, i) => new Vertex(v));

    this.faces = faces.map((f, j) => {
      const face = this.addFace();
      const points = f.map((v) => this.vertices[v]);

      let last = null;
      const halfEdges = points.map((v) => {
        const he = this.addHalfEdge(v, face);
        if (!v.halfEdge) {
          // vertex doesn't have a half edge yet, so set it
          v.halfEdge = he;
        }

        if (last) {
          last.next = he;
        }

        last = he;
        return he;
      });

      halfEdges[2].next = halfEdges[0];

      face.halfEdge = halfEdges[0];

      return face;
    });

    // the faces are all free standing, so now marry them, setting the twins and creating edges
    this.halfEdges.forEach((he) => {
      if (!he.twin) {
        // create the edge
        const edge = this.addEdge(he);
        he.edge = edge;

        // find the twin
        const twin = this.halfEdges.find(
          (other) =>
            other.vertex === he.next.vertex && other.next.vertex === he.vertex
        );
        // connect the twins
        he.twin = twin;
        if (twin) {
          twin.edge = edge;
          twin.twin = he;
        }
      }
    });
  }

  addFace(halfEdge = null) {
    const face = new Face(halfEdge);
    this.faces.push(face);
    return face;
  }

  addVertex(position) {
    const vertex = new Vertex(position);
    this.vertices.push(vertex);
    return vertex;
  }

  addEdge(halfEdge = null) {
    const edge = new Edge(this, halfEdge);
    this.edges.push(edge);
    return edge;
  }

  addHalfEdge(vertex, face, edge = null) {
    const halfEdge = new HalfEdge(vertex, face, edge);
    this.halfEdges.push(halfEdge);
    return halfEdge;
  }

  
}
