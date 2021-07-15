import request from '@/utils/request'

const assetRootUri = '/entity-mgmt/assets'

export function getAssets(pageRequest) {
  return request({
    url: assetRootUri,
    method: 'GET'
  })
}

export function createAsset(asset) {
  return request({
    url: assetRootUri,
    method: 'POST',
    data: asset
  })
}
