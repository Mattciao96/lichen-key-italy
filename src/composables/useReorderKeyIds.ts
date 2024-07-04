/*
export default function useReorderKeyIds(list) {
  // Create a mapping of old leadIds to new leadIds
  let idMap = {}
  let newId = 1

  // First pass: create the mapping
  for (let item of list) {
    idMap[item.leadId] = newId++
  }

  // Second pass: update the leadIds and parentIds
  for (let item of list) {
    item.leadId = idMap[item.leadId]
    if (item.parentId !== 0) {
      item.parentId = idMap[item.parentId]
    }
    if (item.leadTo !== null) {
      item.leadTo = idMap[item.leadTo]
    }
  }

  return list
}
*/

export default function useReorderKeyIds(list) {
  let idMap = {}
  let newId = 1

  // First pass: create the mapping
  for (let item of list) {
    if (item.leadRecordId === null) {
      idMap[item.leadId] = newId++
    } else {
      idMap[item.leadId] = item.leadSpecies
    }
  }

  // Second pass: update the leadIds and parentIds
  for (let item of list) {
    if (item.leadRecordId === null) {
      item.leadId = idMap[item.leadId]
    } else {
      item.leadId = item.leadSpecies
    }

    if (item.parentId !== 0) {
      item.parentId = idMap[item.parentId]
    }

    if (item.leadTo !== null) {
      item.leadTo = idMap[item.leadTo]
    }
  }

  // Sort the list by parentId
  list.sort((a, b) => {
    if (a.parentId === 0 && b.parentId === 0) {
      return 0 // Both are root nodes, maintain original order
    } else if (a.parentId === 0) {
      return -1 // Root nodes come first
    } else if (b.parentId === 0) {
      return 1 // Root nodes come first
    } else {
      return a.parentId - b.parentId // Sort by parentId
    }
  })

  return list
}
