// Add images and
// the first value display is bugged
class Node {
  constructor(data) {
    this.data = data
    this.children = []
  }

  addChild(node) {
    this.children.push(node)
  }

  getSpeciesIds() {
    let speciesIds = []

    if (this.data.leadSpeciesId !== null) {
      speciesIds.push(this.data.leadSpeciesId)
    }

    for (let child of this.children) {
      speciesIds = speciesIds.concat(child.getSpeciesIds())
    }

    return speciesIds
  }
}

export default class Tree {
  constructor() {
    this.nodes = {}
  }

  buildTree(data) {
    console.log(data)
    for (let item of data.keyData) {
      let node = new Node(item)
      this.nodes[item.leadId] = node
    }

    for (let id in this.nodes) {
      let node = this.nodes[id]
      if (this.nodes[node.data.parentId]) {
        this.nodes[node.data.parentId].addChild(node)
      }
    }

    this.root = this.nodes[data.keyData[0].leadId]
  }

  isRoot(node) {
    return this.root === node
  }
  find(leadId) {
    return this.findRecursive(this.root, leadId)
  }

  findRecursive(node, leadId) {
    if (node.data.leadId === leadId) {
      return node
    }

    for (let child of node.children) {
      let result = this.findRecursive(child, leadId)
      if (result !== null) {
        return result
      }
    }

    return null
  }

  updateNodes() {
    this.nodes = this.getNodesRecursive(this.root)
  }

  getNodesRecursive(node) {
    let nodes = { [node.data.leadId]: node }

    for (let child of node.children) {
      nodes = { ...nodes, ...this.getNodesRecursive(child) }
    }

    return nodes
  }

  getLeaves(leadId) {
    let node = this.find(leadId)
    return node ? this.getLeavesRecursive(node) : null
  }

  getLeavesRecursive(node) {
    if (node.children.length === 0) {
      return [node]
    }

    let leaves = []
    for (let child of node.children) {
      leaves = leaves.concat(this.getLeavesRecursive(child))
    }

    return leaves
  }

  getNumberOfUniqueLeaves(leadId) {
    let node = this.find(leadId)
    if (!node) {
      return null
    }

    let leaves = this.getLeavesRecursive(node)
    let uniqueSpeciesIds = new Set(leaves.map((leaf) => leaf.data.leadSpeciesId))

    return uniqueSpeciesIds.size
  }

  getTreeAsListById(leadId) {
    if (!leadId) {
      return this.getTreeAsList()
    }
    let startNode = this.find(leadId)
    if (!startNode) {
      return this.getTreeAsList()
    }
    return this.getTreeAsList(startNode)
  }

  getTreeAsList(node = this.root) {
    if (!node) {
      return []
    }

    let list = [node.data]

    for (let child of node.children) {
      list = list.concat(this.getTreeAsList(child))
    }

    list.sort((a, b) => {
      if (a.parentId < b.parentId) {
        return -1
      }
      if (a.parentId > b.parentId) {
        return 1
      }
      return 0
    })

    return list
  }

  getNumberOfLeaves(leadId) {
    let node = this.find(leadId)
    return node ? this.getLeavesRecursive(node).length : null
  }

  getNumberOfChildrenLeaves(leadId) {
    let node = this.find(leadId)
    if (!node) {
      return null
    }

    let numberOfChildrenLeaves = node.children.map((child) => this.getLeavesRecursive(child).length)
    return numberOfChildrenLeaves
  }

  prune3(leadRecordIds) {
    this.root = this.pruneRecursive3(this.root, leadRecordIds)
    this.adjustIds()
  }

  pruneRecursive3(node, leadRecordIds) {
    node.children = node.children
      .map((child) => this.pruneRecursive3(child, leadRecordIds))
      .filter(Boolean)

    if (leadRecordIds.includes(node.data.leadRecordId)) {
      return node
    }

    if (node.children.length > 1) {
      return node
    }

    if (node.children.length === 1) {
      let parentNode = this.find(node.data.parentId)
      // this cover singles before the first couplet
      // still keeps 0
      if (!parentNode) {
        return node.children[0]
      }

      if (parentNode.children.length > 1) {
        // ! original bugged
        node.children[0].data.parentId = node.data.parentId
        node.children[0].data.leadText = node.data.leadText
        //node.children[0].data.leadText = 'oh no garbage';

        node.children[0].data.leadImage = node.data.leadImage

        return node.children[0]
      } else {
        //! this works but souldn't
        //node.children[0].parentId = parentNode.leadId;
        // ? this is correct and, for now works
        node.children[0].data.parentId = parentNode.data.parentId
        return node.children[0]
      }
    }

    return null
  }
  setNewRoot() {
    let currentNode = this.root

    while (currentNode) {
      if (currentNode.children.length >= 2) {
        this.root = currentNode
        return
      }

      currentNode = currentNode.children[0]
    }
  }
  getRootNodeLeadId() {
    return this.root ? this.root.data.leadId : null
  }

  adjustIds() {
    if (!this.root) return

    let idCounter = 1

    const adjustIdsRecursive = (node, parentId) => {
      const oldId = node.data.leadId

      if (node.data.leadSpeciesId !== null) {
        node.data.leadId = node.data.leadSpecies
      } else {
        node.data.leadId = idCounter++
      }

      node.data.parentId = parentId

      // Update references in the nodes object
      delete this.nodes[oldId]
      this.nodes[node.data.leadId] = node

      for (let child of node.children) {
        adjustIdsRecursive(child, node.data.leadId)
      }
    }

    adjustIdsRecursive(this.root, null)
  }
}
