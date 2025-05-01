# Three.js Samples

Three.jsのサンプルコード集です。

## サンプル一覧

### CSG (Constructive Solid Geometry) サンプル

このサンプルでは、`three-bvh-csg`ライブラリを使用して、CSG（構成的立体幾何学）の基本的な操作を実装しています。

#### 主な機能

- 立方体と円柱を使用したCSG減算操作
- 3Dビューアでの結果の表示
- 元の形状と結果の表示切り替え
- STLファイルとしてのエクスポート機能

#### 技術的な特徴

- `three-bvh-csg`ライブラリを使用した効率的なCSG操作
- `three-mesh-bvh`による高速な衝突判定
- OrbitControlsによるインタラクティブな3Dビュー操作
- FileSaver.jsを使用したSTLファイルのダウンロード機能

#### 使用方法

1. ブラウザで`index.html`を開く
2. 3Dビューで結果を確認
3. 「表示切替」ボタンで元の形状と結果を切り替え
4. 「STLダウンロード」ボタンで結果をSTLファイルとして保存

#### 依存関係

- three.js
- three-bvh-csg
- three-mesh-bvh
- FileSaver.js
