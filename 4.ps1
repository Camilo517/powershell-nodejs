param (
    [Parameter(Mandatory = $false)]
    [string] $ComputerName = 'localhost'
)

 
  $drives =  Get-WmiObject -Class win32_product | 
    Select-Object   @{Name='Ordenador';     Expr={$ComputerName}},
	@{Name='Nombre del programa';     Expr={$_.Name}},  
	@{Name='Empresa';     Expr={$_.Vendor}},
	@{Name='Version';     Expr={$_.Version}}  
$drives | ConvertTo-Json -Compress