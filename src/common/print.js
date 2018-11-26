export function Print (e) {
  let openWindow = window.open('', '_blank', 'top=100,left=200,height=600,width=800,status=yes,toolbar=1,menubar=no,location=no,scrollbars=yes')
  let subOutputRankPrint = document.getElementById(e)
  let newContent = subOutputRankPrint.innerHTML
  // let oldContent = document.body.innerHTML
  openWindow.document.write('<html><head><meta charset="utf-8"><title>打印</title><link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css"></head><body>')
  openWindow.document.write(newContent)
  openWindow.document.write('</body></html>')
  openWindow.document.write('<style type="text/css">.item{margin-bottom: 10px;font-size: 15px}.ivu-table-wrapper .ivu-table{height: 100%}</style>')
  // document.body.innerHTML = newContent
  // openWindow.print()
  openWindow.document.close()
  openWindow.focus()
  setTimeout(() => {
    openWindow.print()
    openWindow.close()
  }, 1500)
  return false
}