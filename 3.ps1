param (
    [Parameter(Mandatory = $false)]
    [string] $ComputerName = 'localhost'
)

 
  $drives =  Get-process | 
    Select-Object   @{Name='Ordenador';     Expr={$ComputerName}},
	@{Name='Nombre del proceso';     Expr={$_.ProcessName}},  
	@{Name='CPU';     Expr={$_.CPU}},
	@{Name='ID';     Expr={$_.Id}}  
$drives | ConvertTo-Json -Compress